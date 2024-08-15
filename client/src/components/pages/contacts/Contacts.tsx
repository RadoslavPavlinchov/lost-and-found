export default function Contacts() {
    return (
        <div className="max-w-5xl min-h-screen mx-auto mt-20 p-4 rounded-lg shadow-lg">
            <div className="flex flex-col md:flex-row md:space-x-8">
                <div className="flex-1 space-y-4">
                    <h1 className="text-3xl font-bold mb-4">Contacts</h1>
                    <p className="mb-6">
                        Feel free to reach out to any of our contacts below:
                    </p>
                    <ul className="space-y-4">
                        <li className="p-4 bg-white rounded-lg shadow-md">
                            <h2 className="text-xl font-semibold">John Doe</h2>
                            <p>Email: john.doe@example.com</p>
                            <p>Phone: (123) 456-7890</p>
                        </li>
                        <li className="p-4 bg-white rounded-lg shadow-md">
                            <h2 className="text-xl font-semibold">
                                Jane Smith
                            </h2>
                            <p>Email: jane.smith@example.com</p>
                            <p>Phone: (987) 654-3210</p>
                        </li>
                        <li className="p-4 bg-white rounded-lg shadow-md">
                            <h2 className="text-xl font-semibold">
                                Alice Johnson
                            </h2>
                            <p>Email: alice.johnson@example.com</p>
                            <p>Phone: (555) 123-4567</p>
                        </li>
                    </ul>
                </div>
                <div className="flex-1 mt-8 md:mt-0">
                    <h2 className="text-2xl font-semibold mb-4">
                        Contact Form
                    </h2>
                    <form className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium">
                                Name
                            </label>
                            <input
                                type="text"
                                className="w-full p-2 border rounded-lg"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">
                                Email
                            </label>
                            <input
                                type="email"
                                className="w-full p-2 border rounded-lg"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">
                                Message
                            </label>
                            <textarea
                                className="w-full p-2 border rounded-lg"
                                rows="4"
                            ></textarea>
                        </div>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue text-white rounded-lg"
                            onClick={(e) => e.preventDefault()}
                        >
                            Send
                        </button>
                    </form>
                </div>
            </div>
            <div className="mt-8">
                <h2 className="text-2xl font-semibold mb-4">Our Location</h2>
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.086509486634!2d144.9630583153167!3d-37.8141079797517!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf577d1b1f1e6e0b!2sFederation%20Square!5e0!3m2!1sen!2sau!4v1611819441234!5m2!1sen!2sau"
                    width="100%"
                    height="300"
                    className="border rounded-lg"
                    allowFullScreen=""
                    loading="lazy"
                ></iframe>
            </div>
            <div className="mt-8">
                <h2 className="text-2xl font-semibold mb-4">Follow Us</h2>
                <div className="flex space-x-4">
                    <a href="https://facebook.com" className="text-blue-600">
                        Facebook
                    </a>
                    <a href="https://twitter.com" className="text-blue-400">
                        Twitter
                    </a>
                    <a href="https://linkedin.com" className="text-blue-700">
                        LinkedIn
                    </a>
                </div>
            </div>
            <div className="mt-8">
                <h2 className="text-2xl font-semibold mb-4">Office Hours</h2>
                <p>Monday - Friday: 9:00 AM - 5:00 PM</p>
                <p>Saturday - Sunday: Closed</p>
            </div>
            <div className="mt-8">
                <h2 className="text-2xl font-semibold mb-4">Address</h2>
                <p>123 Main Street, Anytown, USA</p>
            </div>
        </div>
    )
}
