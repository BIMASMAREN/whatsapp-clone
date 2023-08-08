import { NextResponse } from "next/server";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "@/firebase/firebase";
const auth = getAuth(app);

export async function POST(request) {
  const body = await request.json();
  const { email, password } = body;
  if (!email || !password) {
    return NextResponse.json("Missing fields", { status: 400 });
  }
  try {
    const res = await signInWithEmailAndPassword(auth, email, password);
    return NextResponse.json(res.user, { status: 200 });
  } catch (error) {
    return NextResponse.json(error.code, { status: 400 });
  }
}
