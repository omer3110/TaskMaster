import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import HomePageImage from "../images/HomePage.jpeg";
import { Button } from "../components/ui/button";
import { AuthContext } from "@/contexts/Auth.context";
import WithLoader from "../components/WithLoader";
import { BarChart4, Bell, LayoutList, Users } from "lucide-react";

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "../components/ui/accordion"; // Ensure the path is correct

const HomePage = () => {
  const navigate = useNavigate();
  const { loggedInUser } = useContext(AuthContext);

  return (
    <div className="min-h-screen flex flex-col items-center bg-background text-foreground">
      <header className="w-full py-8 bg-secondary text-secondary-foreground text-center">
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-2">
          Welcome to TaskMaster
        </h1>
        <p className="text-lg">Your ultimate task management solution</p>
      </header>

      <section className="sm:w-full sm:max-w-5xl text-center p-8 rounded-lg shadow-lg bg-card mt-8 mx-6">
        <h2 className="text-3xl font-bold mb-4">Why TaskMaster?</h2>
        <p className="text-lg mb-8">
          TaskMaster helps you organize and manage your tasks efficiently. Our
          intuitive and user-friendly interface ensures that you stay on top of
          your daily tasks, deadlines, and projects. Get started by logging in
          or registering now!
        </p>
        <img
          src={HomePageImage}
          alt="Task management"
          className="w-4/5 h-96 object-cover mb-8 m-auto rounded-lg shadow-lg"
        />
      </section>

      <section className="w-full max-w-4xl text-left p-8 mt-8">
        <h2 className="text-3xl font-bold mb-4">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex items-start">
            <div className="bg-primary text-primary-foreground rounded-full p-3 mr-4">
              <LayoutList />
            </div>
            <div>
              <h3 className="text-xl font-bold">Task Management</h3>
              <p>
                Organize your tasks into projects and set deadlines to ensure
                timely completion.
              </p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="bg-primary text-primary-foreground rounded-full p-3 mr-4">
              <Users />
            </div>
            <div>
              <h3 className="text-xl font-bold">Team Collaboration</h3>
              <p>
                Work with your team seamlessly with shared tasks and real-time
                updates.
              </p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="bg-primary text-primary-foreground rounded-full p-3 mr-4">
              <BarChart4 />
            </div>
            <div>
              <h3 className="text-xl font-bold">Progress Tracking</h3>
              <p>
                Keep track of your progress with visual charts and timely
                reports.
              </p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="bg-primary text-primary-foreground rounded-full p-3 mr-4">
              <Bell />
            </div>
            <div>
              <h3 className="text-xl font-bold">Reminders & Notifications</h3>
              <p>
                Set reminders and get notified about upcoming deadlines and
                important updates.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="sm:w-full sm:max-w-4xl w-3xl text-left p-8 mx-6 mt-8 bg-card rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-4">Q&A</h2>
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>What is TaskMaster?</AccordionTrigger>
            <AccordionContent>
              TaskMaster is a task management tool designed to help individuals
              and teams organize and manage their tasks efficiently.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>How do I get started?</AccordionTrigger>
            <AccordionContent>
              You can get started by registering for a new account and logging
              in. Once logged in, you can create, manage, and track your tasks.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Can I collaborate with my team?</AccordionTrigger>
            <AccordionContent>
              Yes, TaskMaster allows you to collaborate with your team by
              assigning tasks, setting deadlines, and tracking progress.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger>Is TaskMaster free to use?</AccordionTrigger>
            <AccordionContent>
              TaskMaster offers both free and premium plans. The free plan
              includes basic features, while the premium plan offers advanced
              features for a subscription fee.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>

      <section className="w-full max-w-4xl text-center p-8 mt-8">
        <h2 className="text-3xl font-bold mb-4">Join Our Community</h2>
        <p className="text-lg mb-8">
          Join thousands of satisfied users who have transformed their task
          management with TaskMaster. Get started today and take control of your
          productivity!
        </p>
        <Button
          className="px-6 py-3 bg-primary text-primary-foreground"
          onClick={() => navigate("/auth/register")}
        >
          Get Started
        </Button>
      </section>
    </div>
  );
};

export default WithLoader(HomePage);
