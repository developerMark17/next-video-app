
export function Footer() {
  return (
    <footer className=" text-white py-8">
      <div className="container mx-auto px-4">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0 mt-10">
          {/* Logo or Branding */}
          <div className="text-lg font-bold">Video App</div>

       
        </div>

        {/* Divider */}
        <div className="my-6 border-t border-gray-700"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400 space-y-4 md:space-y-0">
          <p>&copy; {new Date().getFullYear()} Video App. All Rights Reserved.</p>
          <p>
            Made with ❤️ by Airaz Khan
          </p>
        </div>
      </div>
    </footer>
  );
}
