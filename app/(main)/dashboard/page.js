import React from 'react'
import DashboardHeader from './_components/DashboardHeader';
import HeroSection from './_components/HeroSection';
import RecentProjectsSection from './_components/RecentProjectsSection';
import TemplatesLibrarySection from './_components/TemplatesLibrarySection';
import AIPromptsSection from './_components/AIPromptsSection';

const Dashboard = () => {
    return (
        <div className="min-h-screen relative bg-white overflow-hidden">
            {/* Very subtle blurred accents */}
            {/* Content */}
            <div className="relative max-w-7xl mx-auto p-6">
                {/* Header */}
                <DashboardHeader />

                {/* Hero Section */}
                <HeroSection />

                {/* Recent Projects */}
                <RecentProjectsSection />

                {/* Templates Library */}
                <TemplatesLibrarySection />

                {/* AI Prompts */}
                <AIPromptsSection />
            </div>
        </div>
    )
}

export default Dashboard;
