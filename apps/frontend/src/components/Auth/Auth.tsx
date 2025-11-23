import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import "./Auth.css";

export default function Auth() {
  return (
    <div className="auth-container">
      <SignedOut>
        <SignInButton mode="modal">
          <button className="sign-in-button">
            Sign In
          </button>
        </SignInButton>
      </SignedOut>
      <SignedIn>
        <UserButton afterSignOutUrl="/" />
      </SignedIn>
    </div>
  );
}