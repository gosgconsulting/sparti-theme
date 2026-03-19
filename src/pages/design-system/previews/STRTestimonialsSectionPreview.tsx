/**
 * Design system preview for STR Testimonials Section.
 * Renders the section with mock data (no API calls).
 */

import React from "react";
import { STRTestimonialsSection } from "@/themes/str/components/STRTestimonialsSection";
import type { STRTestimonial, STRPlaceInfo } from "@/themes/str/services/googleReviews";

const now = Math.floor(Date.now() / 1000);
const oneDayAgo = now - 86400;
const oneWeekAgo = now - 86400 * 7;

const mockTestimonials: STRTestimonial[] = [
  {
    name: "Melissa K.",
    role: "Student",
    quote:
      "The Coaches Are Knowledgeable And Supportive, Making Every Workout Feel Focused, Effective, And Perfectly Aligned With My Fitness Goals.",
    rating: 5,
    time: now,
    relativeTime: "Recently",
  },
  {
    name: "Daniel R.",
    role: "Entrepreneur",
    quote:
      "Training Here Feels Structured And Motivating, With Clear Guidance That Helps Me Stay Consistent And See Real Progress Over Time.",
    rating: 5,
    time: oneDayAgo,
    relativeTime: "1 day ago",
  },
  {
    name: "Sarah L.",
    role: "Professional",
    quote:
      "I've Tried Many Gyms, But STR Stands Out With Its Personalized Approach. Every Session Is Tailored To My Needs.",
    rating: 5,
    time: oneWeekAgo,
    relativeTime: "1 week ago",
  },
  {
    name: "Michael T.",
    role: "Executive",
    quote:
      "The One-On-One Attention Makes All The Difference. My Coach Understands My Busy Schedule And Creates Workouts That Fit Perfectly.",
    rating: 5,
    time: oneWeekAgo,
    relativeTime: "1 week ago",
  },
  {
    name: "Emma W.",
    role: "Rehabilitation Client",
    quote:
      "After My Injury, I Was Nervous About Training Again. The Team At STR Created A Safe, Progressive Program That Helped Me Recover Stronger.",
    rating: 5,
    time: oneWeekAgo,
    relativeTime: "1 week ago",
  },
  {
    name: "James H.",
    role: "Competitive Athlete",
    quote:
      "The Assessment Process Is Thorough And The Training Plans Are Data-Driven. I've Hit Personal Bests I Never Thought Possible.",
    rating: 5,
    time: oneWeekAgo,
    relativeTime: "1 week ago",
  },
];

const mockPlaceInfo: STRPlaceInfo = {
  rating: 4.9,
  totalReviews: 127,
  name: "STR Fitness Club",
  address: "38 N Canal Rd, #05-01, Singapore 059294",
};

export function STRTestimonialsSectionPreview() {
  return (
    <STRTestimonialsSection
      title="RESULT YOU CAN FEEL & SEE"
      buttonText="START YOUR JOURNEY"
      buttonUrl="#"
      testimonials={mockTestimonials}
      placeInfo={mockPlaceInfo}
      loading={false}
    />
  );
}
