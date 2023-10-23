// components/SignupButton.js
import Link from "next/link";
import Image from "next/image";

const SignInButton = ({ href, iconSrc, text }) => {
  return (
    <Link
      href={href}
      title=""
      className="
      flex items-center justify-center w-full px-6 py-3 mt-8
      text-sm font-bold text-gray-900 transition-all duration-200
      bg-gray-100 border border-transparent rounded-xl hover:bg-gray-200
      focus:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200
      font-pj"
      role="button"
    >
      <div className="flex items-center">
        <Image className="w-5 h-5 mr-4" src={iconSrc} alt="Icon" />
        <span className="text-base">{text}</span>
      </div>
    </Link>
  );
};

export default SignInButton;
