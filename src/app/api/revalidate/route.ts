import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

// Strapi webhook endpoint: POST /api/revalidate
// Purges the whole site cache (data cache + full route cache) so changed
// content is regenerated on the next visit.
// Optional: ?path=/en/posts revalidates only that path.
function revalidate(request: NextRequest) {
  const secret =
    request.headers.get("x-revalidate-secret") ??
    request.nextUrl.searchParams.get("secret");

  if (!process.env.REVALIDATE_SECRET || secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
  }

  const path = request.nextUrl.searchParams.get("path");
  try {
    if (path) {
      revalidatePath(path);
    } else {
      revalidatePath("/", "layout");
    }
    return NextResponse.json({ revalidated: true, path: path ?? "all", now: Date.now() });
  } catch (error) {
    return NextResponse.json(
      { message: "Error revalidating", error: String(error) },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  return revalidate(request);
}

// GET allows triggering a revalidation manually from the browser
export async function GET(request: NextRequest) {
  return revalidate(request);
}
