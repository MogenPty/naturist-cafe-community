import { useForm, ValidationError } from "@formspree/react";
import React from "react";

function ContactForm() {
  const [state, handleSubmit] = useForm("xqavrbjr");
  if (state.succeeded) {
    return <p>Thanks for joining!</p>;
  }
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="email">Email Address</label>
      <input title="email" id={`contact-email`} type="email" name="email" />
      <ValidationError prefix="Email" field="email" errors={state.errors} />
      <textarea id={"contact-message"} title="message" name="message" />
      <ValidationError prefix="Message" field="message" errors={state.errors} />
      <button type="submit" disabled={state.submitting}>
        Submit
      </button>
    </form>
  );
}

export default ContactForm;
