"use client";

import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import FadeIn from "@/components/ui/fade-in";

const contactFormSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    subject: z.string().min(3, { message: "Subject must be at least 3 characters" }),
    message: z.string().min(10, { message: "Message must be at least 10 characters" }),
});

function Contact() {
    const { toast } = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const form = useForm({
        resolver: zodResolver(contactFormSchema),
        defaultValues: { email: "", subject: "", message: "" },
    });

    const onSubmit = async (data: z.infer<typeof contactFormSchema>) => {
        setIsSubmitting(true);
        try {
            const response = await fetch("/api/py/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (!response.ok) throw new Error("Failed to send message");

            toast({
                title: "Message Sent",
                description: "Your message has been successfully submitted. We'll get back to you soon!",
                variant: "default",
            });

            form.reset();
        } catch {
            toast({
                title: "Error",
                description: "Failed to send message. Please try again.",
                variant: "destructive",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section id="contact-us" className="mx-auto max-w-3xl py-20 px-4 sm:py-28 lg:px-6">
            <FadeIn>
                <div className="text-center mb-6 space-y-6">
                    <h2 className="text-3xl md:text-4xl text-primary tracking-tight">Contact Us</h2>
                    <p className="text-muted-foreground">
                        Send us a message, and we&apos;ll get back to you as soon as possible. You can also reach us at{" "}
                        <a href="mailto:utdallas@consultyourcommunity.org" className="underline text-primary">
                            utdallas@consultyourcommunity.org
                        </a>
                    </p>
                </div>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Your Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="you@example.com" className="text-sm" {...field} type="email" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="subject"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Subject</FormLabel>
                                    <FormControl>
                                        <Input placeholder="What can we help you with?" className="text-sm" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="message"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Your Message</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Type your message here..." rows={6} className="text-sm" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button type="submit" className="w-full" disabled={isSubmitting}>
                            {isSubmitting ? "Sending..." : "Send Message"}
                        </Button>
                    </form>
                </Form>
            </FadeIn>
        </section>
    );
}

export default Contact;
