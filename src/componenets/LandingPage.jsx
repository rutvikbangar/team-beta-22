import React, { useState, useEffect } from "react";
import MultiLayer from "./multilayer.jsx";

export default function Home() {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            const documentHeight = document.documentElement.scrollHeight;
            const windowHeight = window.innerHeight;

            // Check if the page is scrolled to the bottom
            if (scrollPosition + windowHeight >= documentHeight) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        // Listen for scroll events
        window.addEventListener("scroll", handleScroll);

        // Cleanup on component unmount
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <main className="w-full h-screen bg-transparent">
            {/* Navigation Bar */}
            <nav className="w-full fixed top-0 left-0 bg-transparent py-4 px-8 z-10">
                <div className="flex justify-between items-center">
                   
                </div>
            </nav>

            <MultiLayer />

            {/* About Us Section */}
            <div className="w-full h-screen flex items-center justify-center bg-gray-900 text-white px-8">
                <div className="text-center max-w-3xl">
                    <h1 className="text-5xl font-bold mb-6">About Us</h1>
                    <p className="text-lg leading-relaxed">
                        Welcome to MOODMATE – A Web Application Designed to Promote Mental Well-being through a Gamified Experience. We believe mental health is just as important as physical health, and improving it should be engaging and rewarding. Our platform combines technology, motivation, and gamification to create a supportive environment.
                    </p>
                    <p className="mt-4 text-lg leading-relaxed">
                        Here’s how we make a difference:
                        <ul className="list-disc ml-8">
                            <li><strong>Goal Completion:</strong> Set tasks, earn rewards, and receive a greeting from a virtual pet for each achievement. This helps reduce stress, anxiety, and boosts self-esteem.</li>
                            <li><strong>Awards and Pet Levels:</strong> Earn coins to level up your virtual pet, creating a sense of progress and reducing loneliness.</li>
                            <li><strong>Motivational Thoughts:</strong> Daily quotes to inspire positivity and calmness. Positive affirmations reduce stress and promote resilience.</li>
                            <li><strong>AI Chatbot for Support:</strong> Provides immediate conversational support, reducing isolation and helping users through challenges.</li>
                            <li><strong>Healthy Exercise Reminders:</strong> Get reminders for physical activity and social interaction to boost mood and happiness.</li>
                        </ul>
                    </p>
                    <p className="mt-4 text-lg leading-relaxed">
                        <strong>Our Mission:</strong><br />
                        We aim to provide a fun, supportive environment to focus on mental health. Through goal-setting, rewards, and healthy habits, we empower users to build lasting mental well-being.
                    </p>
                    <p className="mt-4 text-lg leading-relaxed">
                        <strong>Join Us Today!</strong><br />
                        Take the first step toward a healthier, happier mind with MOODE-MATE.
                    </p>
                </div>
            </div>

            {/* Scroll Button */}
            {!isScrolled && (
                <button
                    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                    className="fixed bottom-10 right-10 bg-blue-800 text-white py-3 px-6 rounded-full opacity-50 hover:opacity-100 transition-opacity duration-300"
                >
                    Scroll to Top
                </button>
            )}

            {/* Footer Section */}
            <footer className="w-full bg-gray-800 text-white py-6 mt-12">
                <div className="text-center">
                    <p className="text-lg">&copy; 2024 MOODE-MATE. All Rights Reserved.</p>
                    <div className="mt-4">
                        <a href="https://www.facebook.com" className="mx-3 text-xl hover:text-gray-400">Facebook</a>
                        <a href="https://www.twitter.com" className="mx-3 text-xl hover:text-gray-400">Twitter</a>
                        <a href="https://www.instagram.com" className="mx-3 text-xl hover:text-gray-400">Instagram</a>
                        <a href="https://www.linkedin.com" className="mx-3 text-xl hover:text-gray-400">LinkedIn</a>
                    </div>
                    <p className="mt-4 text-sm">
                        Contact us: support@moode-mate.com
                    </p>
                </div>
            </footer>
        </main>
    );
}