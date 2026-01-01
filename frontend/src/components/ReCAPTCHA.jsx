import ReCAPTCHA from "react-google-recaptcha";

export default function ReCAPTCHAField({ onVerify, theme = "light" }) {
  return (
    <ReCAPTCHA
      sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
      onChange={onVerify}
      theme={theme}
    />
  );
}
