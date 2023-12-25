export default function Footer() {
  return (
    <div className="w-full bg-primary bg-gray-800 fixed bottom-0 left-0">
      <div className="px-5 w-full flex items-center justify-between py-3">
        <p className="text-white text-xs font-light">
          Copyright. {new Date().getFullYear()}. Sohye LLC All Right Reserved.
        </p>
      </div>
    </div>
  );
}
