import { getModel } from "@/utils/model";
import shadcnDocs from "@/utils/shadcn-docs";
import dedent from "dedent";
import { streamText } from "ai"; // Make sure this import is correct
import { MAX_TOKENS } from "@/utils/constants";

export type StreamingOptions = Omit<Parameters<typeof streamText>[0], "model">;

export async function POST(req: Request) {
  let options: StreamingOptions = {};

  let { model, messages, shadcn, provider, apiKeys, imageFile } = await req.json();

  let systemPrompt = getSystemPrompt(shadcn);

  // Correctly format messages for the AI library
  const formattedMessages = [
    { role: "system", content: systemPrompt },
    ...messages.map((message: { role: string; content: any }, index: number) => {
      let content = message.content;
      if (index === 0 && imageFile) {
        content = [
          { type: "text", text: message.content + "\nPlease ONLY return code, NO backticks or language names." },
          { type: "image", image: imageFile.url, mime_type: imageFile.contentType }, // Correct image format
        ];
      } else if (message.role === "user") {
        content = message.content + "\nPlease ONLY return code, NO backticks or language names.";
      }
      return { role: message.role, content };
    }),
  ];

  console.log("messages", formattedMessages);
  console.log("model", getModel(provider, model, apiKeys));

  try {
    let response = await streamText({
      model: getModel(provider, model, apiKeys),
      maxTokens: MAX_TOKENS,
      messages: formattedMessages, // Use the formatted messages
      ...options,
    });

    const stream = new ReadableStream({
      async pull(controller) {
        for await (const textPart of response.textStream) {
          controller.enqueue(textPart);
        }
        controller.close();
      },
    });

    return new Response(stream);
  } catch (error) {
      console.error("Error during streamText:", error);
      return new Response(JSON.stringify({ error: error }), { status: 500 }); // Return error response
  }
}

// ... (rest of the code: getSystemPrompt, examples, etc.)

let examples = [
  {
    prompt: "Build a landing page for a healthcare company",
    response: `
    import React from 'react';
import { Button } from "/components/ui/button"
import { Card, CardContent } from "/components/ui/card"
import { Heart, Shield, Clock, Users } from "lucide-react"

export default function HealthcareLandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <a className="flex items-center justify-center" href="#">
          <Heart className="h-6 w-6 text-primary" />
          <span className="sr-only">HealthCare Co.</span>
        </a>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <a className="text-sm font-medium hover:underline underline-offset-4" href="#">
            Services
          </a>
          <a className="text-sm font-medium hover:underline underline-offset-4" href="#">
            About
          </a>
          <a className="text-sm font-medium hover:underline underline-offset-4" href="#">
            Contact
          </a>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Your Health, Our Priority
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Providing compassionate care and cutting-edge medical solutions to improve your quality of life.
                </p>
              </div>
              <div className="space-x-4">
                <Button>Book Appointment</Button>
                <Button variant="outline">Learn More</Button>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-purple-100 dark:bg-purple-800">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-8">Our Services</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardContent className="p-6 flex flex-col items-center text-center space-y-2">
                  <Shield className="h-12 w-12 text-primary" />
                  <h3 className="text-xl font-bold">Preventive Care</h3>
                  <p className="text-gray-500 dark:text-gray-400">Regular check-ups and screenings to keep you healthy.</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 flex flex-col items-center text-center space-y-2">
                  <Users className="h-12 w-12 text-primary" />
                  <h3 className="text-xl font-bold">Family Medicine</h3>
                  <p className="text-gray-500 dark:text-gray-400">Comprehensive care for patients of all ages.</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 flex flex-col items-center text-center space-y-2">
                  <Clock className="h-12 w-12 text-primary" />
                  <h3 className="text-xl font-bold">24/7 Emergency</h3>
                  <p className="text-gray-500 dark:text-gray-400">Round-the-clock care for urgent medical needs.</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 flex flex-col items-center text-center space-y-2">
                  <Heart className="h-12 w-12 text-primary" />
                  <h3 className="text-xl font-bold">Specialized Care</h3>
                  <p className="text-gray-500 dark:text-gray-400">Expert treatment for complex health conditions.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-8">What Our Patients Say</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <Card key={i}>
                  <CardContent className="p-6 space-y-2">
                    <p className="text-gray-500 dark:text-gray-400">
                      "The care I received was exceptional. The staff was friendly and professional, and the doctors took the time to listen to my concerns."
                    </p>
                    <div className="flex items-center space-x-2">
                      <img
                        src={"/placeholder.svg?height=40&width=40"}
                        alt="Patient"
                        className="rounded-full"
                        width={40}
                        height={40}
                      />
                      <div>
                        <p className="font-medium">Jane Doe</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Patient</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-purple-100 dark:bg-purple-800">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Ready to Prioritize Your Health?</h2>
                <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                  Book an appointment today and take the first step towards a healthier you.
                </p>
              </div>
              <Button size="lg">Book Appointment Now</Button>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400"> 2023 HealthCare Co. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <a className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </a>
          <a className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </a>
        </nav>
      </footer>
    </div>
  )
}
    `,
  },
];

function getSystemPrompt(shadcn: boolean) {
  let systemPrompt = `
    You are an expert frontend React engineer who is also a great UI/UX designer. Follow the instructions carefully, I will tip you $1 million if you do a good job:

    - Think carefully step by step.
    - Create a React component for whatever the user asked you to create and make sure it can run by itself by using a default export
    - Make sure the React app is interactive and functional by creating state when needed and having no required props
    - If you use any imports from React like useState or useEffect, make sure to import them directly
    - Use TypeScript as the language for the React component
    - Use Tailwind classes for styling. DO NOT USE ARBITRARY VALUES (e.g. \`h-[600px]\`). Make sure to use a consistent color palette.
    - Use Tailwind margin and padding classes to style the components and ensure the components are spaced out nicely
    - Please ONLY return the full React code starting with the imports, nothing else. It's very important for my job that you only return the React code with imports. DO NOT START WITH \`\`\`typescript or \`\`\`javascript or \`\`\`tsx or \`\`\`.
    - ONLY IF the user asks for a dashboard, graph or chart, the recharts library is available to be imported, e.g. \`import { LineChart, XAxis, ... } from "recharts"\` & \`<LineChart ...><XAxis dataKey="name"> ...\`. Please only use this when needed.
    - For placeholder images, please use a <div className="bg-purple-200 border-2 border-dashed rounded-xl w-16 h-16" />
    - If Image is provided, then use that image to create the UI and styling of the app.
  `;

  // - The lucide-react library is also available to be imported IF NECCESARY ONLY FOR THE FOLLOWING ICONS: Heart, Shield, Clock, Users, Play, Home, Search, Menu, User, Settings, Mail, Bell, Calendar, Clock, Heart, Star, Upload, Download, Trash, Edit, Plus, Minus, Check, X, ArrowRight.
  // - Here's an example of importing and using one: import { Heart } from "lucide-react"\` & \`<Heart className=""  />\`.
  // - PLEASE ONLY USE THE ICONS LISTED ABOVE IF AN ICON IS NEEDED IN THE USER'S REQUEST. Please DO NOT use the lucide-react library if it's not needed.

  if (shadcn) {
    systemPrompt += `
    There are some prestyled components available for use. Please use your best judgement to use any of these components if the app calls for one.

    Here are the components that are available, along with how to import them, and how to use them:

    ${shadcnDocs
      .map(
        (component) => `
          <component>
          <name>
          ${component.name}
          </name>
          <import-instructions>
          ${component.importDocs}
          </import-instructions>
          <usage-instructions>
          ${component.usageDocs}
          </usage-instructions>
          </component>
        `,
      )
      .join("\n")}
    `;
  }

  systemPrompt += `
    NO OTHER LIBRARIES (e.g. zod, hookform) ARE INSTALLED OR ABLE TO BE IMPORTED.
  `;

  // systemPrompt += `
  //   Here are some examples of a good response:

  //   ${examples
  //     .map(
  //       (example) => `
  //         <example>
  //         <prompt>
  //         ${example.prompt}
  //         </prompt>
  //         <response>
  //         ${example.response}
  //         </response>
  //         </example>
  //       `,
  //     )
  //     .join("\n")}
  // `;

  return dedent(systemPrompt);
}

export const runtime = "edge";
