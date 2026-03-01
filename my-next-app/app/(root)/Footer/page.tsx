'use client';

export default function Footer() {
    return (
        <footer className="w-full bg-gray-900 text-white py-8">
            <div className="max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div>
                        <h3 className="text-lg font-bold mb-4">ChronoWeave</h3>
                        <p className="text-gray-400">Your temporary footer content goes here.</p>
                    </div>
                    <div>
                        <h4 className="text-lg font-bold mb-4">Links</h4>
                        <ul className="space-y-2 text-gray-400">
                            <li><a href="#" className="hover:text-white">Home</a></li>
                            <li><a href="#" className="hover:text-white">About</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-lg font-bold mb-4">Contact</h4>
                        <p className="text-gray-400">Email: temp@example.com</p>
                    </div>
                </div>
                <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
                    <p>&copy; 2024 ChronoWeave. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}