import React, { useState } from "react";
import { auth } from "@/auth";
import { RegisterUser } from "@/components/Auth";
import { signIn, signOut } from "@/auth";

 
function SignIn() {
    return (
        <form action={async () => {"use server"; await signIn()}}>
            <button type="submit">Sign in</button>
        </form>
    )
}

function SignOut() {
    return (
        <form action={async () => {"use server"; await signOut()}}>
            <button type="submit">Sign out</button>
        </form>
    )
}


async function Toggle() {
    let session = await auth();
    return session ? <SignOut /> : <SignIn />;
}


export default function Home() {
    return(
        <> 
            <Toggle/>
            <RegisterUser/>
        </>
    )
}