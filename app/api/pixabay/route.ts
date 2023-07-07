import { NextRequest } from "next/server";
import ENV from "utils/env";

export async function GET(req: NextRequest) {
    await fetch(
        `https://pixabay.com/api/?key=${ENV.PIXABAY_API_KEY}`,
        // {
        //   ...(process.env.GITHUB_OAUTH_TOKEN && {
        // //     headers: {
        // //       Authorization: `Bearer ${process.env.GITHUB_OAUTH_TOKEN}`,
        // //       "Content-Type": "application/json",
        // //     },
        // //   }),
        // //   // data will revalidate every 24 hours
        //   next: { revalidate: 86400 },
        // },
      )
        .then((response) => {
            response.json()
        })
        .catch((e) => console.log(e));
}