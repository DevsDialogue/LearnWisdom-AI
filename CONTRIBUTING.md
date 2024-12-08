**package installation**

```bash
npm i

or

npm install
```

**Database Commands**

---

```bash
npx prisma db push
```

this is to see the database in localhost:

```bash
npx prisma studio
```

---

## Shadcn- dependencies

1. **dropdown-menu**

```bash
npx shadcn@latest add dropdown-menu
npx shadcn@latest add avatar

```

2. **button**

```bash
npm i @radix-ui/react-slot
```

3. **Avatar**

```bash
npm i @radix-ui/react-avatar
```

4. **Dark theme**

```bash
npm i next-themes
```

```bash
# Generate Nextauth secret(In Ubuntu)
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Generate Nextauth secret(In Windows) if above command doesn't work
node -e 'console.log(require("crypto").randomBytes(32).toString("hex"))'
```

```bash
npx shadcn@latest add form
```

```bash
npm install react-hook-form
```

```bash
npm install @hookform/resolvers
```

```bash
npx shadcn@latest add input
```

```bash
npx shadcn@latest add separator
```

```bash
npm install framer-motion
```

```bash
npm install openai@3.3.0
```

```bash
npm i @tanstack/react-query
```

```bash
npx shadcn@latest add toast
```

```bash
npm install youtube-transcript
```

```bash
npx shadcn@latest add radio-group
```

```bash
npm install stripe
```

```bash
npm install animated-tooltip
```

---

## Stripe payment local testcase:

```bash
stripe login

```

```bash
stripe listen --forward-to localhost:3000/api/webhook
```

### after running above command you'll get the Webhook secret key add it in the .env as `STRIPE_WEBHOOK_SECRET`
