import { NextResponse } from "next/server";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { app } from "@/firebase/firebase";
const auth = getAuth(app);

export async function POST(request) {
  const body = await request.json();
  const { username, email, password } = body;

  if (!username || !email || !password) {
    return NextResponse.json("Missing fields", { status: 400 });
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    return NextResponse.json(error.code, { status: error.status });
  }
}
