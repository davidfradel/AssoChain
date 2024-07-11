const Footer = () => {
  return (
    <footer className="bg-white text-gray-800 p-4 mt-auto">
      <div className="container mx-auto text-center">
        <p>&copy; {new Date().getFullYear()} AssoChain. All rights reserved</p>
      </div>
    </footer>
  );
}

export default Footer;