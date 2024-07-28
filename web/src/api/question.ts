import { post } from "aws-amplify/api";
import { fetchAuthSession } from "aws-amplify/auth";

interface I {
  model?: string;
  temperature?: number;
  system: string;
  prompt: string;
}

export const getQuestion = async ({
  model = "llama-3.1-70b-versatile",
  temperature = 1,
  system,
  prompt,
}: I) => {
  console.debug({ model, temperature, system, prompt });

  try {
    // Create the event object that Lambda expects
    const eventObject = { model, temperature, system, prompt };

    // https://docs.amplify.aws/react/build-a-backend/add-aws-services/rest-api/post-data/
    const { body } = await post({
      apiName: "Bluey",
      path: "question",
      options: {
        headers: {
          "Content-Type": "application/json",
          // https://docs.amplify.aws/react/build-a-backend/add-aws-services/rest-api/customize-authz/
          Authorization:
            (await fetchAuthSession()).tokens?.idToken?.toString() ?? "",
        },
        body: eventObject,
      },
    }).response;
    const response = await body.json();

    // const result = await fetch(`${import.meta.env.VITE_API_URL}/audio`, {
    //   method: 'POST',
    //   body: JSON.stringify(eventObject),
    //   headers: {
    //     'Content-Type': 'application/json'
    //   }
    // });

    // if (!result.ok) {
    //   throw new Error(`HTTP error! status: ${usescresult.status}`);
    // }
    console.debug({ response });
    const { reply } = response as any;
    console.debug({ reply });

    return reply.choices[0].message.content;
  } catch (error) {
    console.error("Error in translate:", error);
    throw error;
  }
};
