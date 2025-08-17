import axios from "axios";
import { YoutubeTranscript } from "youtube-transcript";
import { strict_output } from "./gemini";

export async function searchYoutube(searchQuery: string) {
  searchQuery = encodeURI(searchQuery);
  
  try {
    const { data } = await axios.get(
      `https://www.googleapis.com/youtube/v3/search?key=${process.env.YOUTUBE_API_KEY}&q=${searchQuery}&videoDuration=medium&videoEmbeddable=true&type=video&maxResults=5`
    );
    
    // Add proper error checking
    if (!data) {
      console.log("YouTube API: No data received");
      return null;
    }
    
    if (!data.items || data.items.length === 0) {
      console.log("YouTube API: No videos found for query:", searchQuery);
      return null;
    }
    
    // Fix: Access the first item in the array, then get the videoId
    const firstVideo = data.items[0];
    if (!firstVideo || !firstVideo.id || !firstVideo.id.videoId) {
      console.log("YouTube API: Invalid video structure");
      return null;
    }
    
    return firstVideo.id.videoId;
  } catch (error) {
    console.error("YouTube search error:", error);
    return null;
  }
}

export async function getTranscript(videoId: string) {
  // List of language codes to try in order of preference
  const languagesToTry = [
    'en',      // English
    'en-US',   // English (US)
    'en-GB',   // English (UK)
    'en-CA',   // English (Canada)
    'en-AU',   // English (Australia)
    'hi',      // Hindi
    'es',      // Spanish
    'fr',      // French
    'de',      // German
    'it',      // Italian
    'pt',      // Portuguese
    'pl',      // Polish
    'ru',      // Russian
    'ja',      // Japanese
    'ko',      // Korean
    'zh',      // Chinese
    'ar',      // Arabic
    'nl',      // Dutch
    'sv',      // Swedish
    'no',      // Norwegian
    'da',      // Danish
    'fi',      // Finnish
  ];

  let transcript = "";
  let lastError = null;

  // Try each language in order
  for (const lang of languagesToTry) {
    try {
      console.log(`Trying to fetch transcript in language: ${lang} for video: ${videoId}`);
      const transcript_arr = await YoutubeTranscript.fetchTranscript(videoId, {
        lang: lang,
      });
      
      if (transcript_arr && transcript_arr.length > 0) {
        for (const t of transcript_arr) {
          transcript += t.text + " ";
        }
        
        transcript = transcript.replaceAll("\n", " ");
        console.log(`Successfully fetched transcript in language: ${lang}`);
        return transcript;
      }
    } catch (error) {
      lastError = error;
      console.log(`Failed to fetch transcript in ${lang}:`, error instanceof Error ? error.message : String(error));
      continue; // Try next language
    }
  }

  // If no transcript found in any specific language, try without specifying language
  try {
    console.log('Trying to fetch transcript without language specification...');
    const transcript_arr = await YoutubeTranscript.fetchTranscript(videoId);
    
    if (transcript_arr && transcript_arr.length > 0) {
      for (const t of transcript_arr) {
        transcript += t.text + " ";
      }
      
      transcript = transcript.replaceAll("\n", " ");
      console.log('Successfully fetched transcript without language specification');
      return transcript;
    }
  } catch (error) {
    console.log('Failed to fetch transcript without language specification:', error instanceof Error ? error.message : String(error));
    lastError = error;
  }

  // If still no transcript, log the error and return null
  console.error('No transcript available in any supported language for video:', videoId);
  console.log("Transcript fetch error:", lastError);
  return null;
}

export async function getQuestionsFromTranscript(
  transcript: string,
  course_title: string
) {
  type Question = {
    question: string;
    answer: string;
    option1: string;
    option2: string;
    option3: string;
  };
  
  try {
    const questions: Question[] = await strict_output(
      "You are a helpful AI that is able to generate multiple choice questions and answers. The length of each answer should not be more than 15 words. Generate exactly 5 questions.",
      new Array(5).fill(
        `You are to generate a random challenging multiple choice question about ${course_title} with context of the following transcript: ${transcript}`
      ),
      {
        question: "question",
        answer: "answer with max length of 15 words",
        option1: "option1 with max length of 15 words",
        option2: "option2 with max length of 15 words", 
        option3: "option3 with max length of 15 words",
      }
    );
    return questions;
  } catch (error) {
    console.error("Question generation error:", error);
    return [];
  }
}