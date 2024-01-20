"use client";

import axios from "axios";
import * as z from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useState} from "react";

import {DocumentSchema} from "@/schemas";
import {Card, CardContent, CardHeader} from "@/components/ui/card";
import {Button} from "@/components/ui/button";

import {Form, FormField, FormControl, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";

import {Textarea} from "@/components/ui/textarea";

import {Pencil1Icon, TrashIcon} from "@radix-ui/react-icons";
import {useCurrentUser} from "@/hooks/use-current-user";
import {redirect, useRouter} from "next/navigation";
import {toast} from "sonner";
import Link from "next/link";
import {Document} from "@prisma/client";
import {ImageField} from "./image-filed";

export const DocumentForm = ({
  title,
  buttonLabel,
  initialData,
}: {
  title: string;
  buttonLabel: string;
  initialData?: Document;
}) => {
  const user = useCurrentUser();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const form = useForm<z.infer<typeof DocumentSchema>>({
    resolver: zodResolver(DocumentSchema),
    defaultValues: {
      title: initialData?.title || "",
      content: initialData?.content || "",
      coverImage: initialData?.coverImage || "",
    },
  });

  if (!user) {
    return redirect("/documents");
  }

  const onSubmit = async (values: z.infer<typeof DocumentSchema>) => {
    try {
      setIsLoading(true);
      if (buttonLabel === "Create") {
        const response = await axios.post("/api/document", {...values, userId: user.id});

        toast.success(`Document created successfully!`);
        router.push(`/documents/${response.data.id}`);
      } else {
        await axios.patch(`/api/document/${initialData?.id}`, {...values, userId: user.id});

        toast.success(`Document updated successfully!`);
      }
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-[600px] flex flex-col">
      <CardHeader className="border-b">
        <p className="text-2xl font-semibold text-center">{title}</p>
      </CardHeader>
      <CardContent className="flex-1 p-4 overflow-y-auto">
        <Form {...form}>
          <form className="space-y-6 flex flex-col" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input {...field} disabled={isLoading} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="content"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Content</FormLabel>
                    <FormControl>
                      <Textarea {...field} disabled={isLoading} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="coverImage"
                render={({field}) => (
                  <FormItem>
                    <div className="flex items-center justify-between w-full">
                      <FormLabel>Cover image</FormLabel>
                      {field.value ? (
                        <FormLabel
                          className="text-xs text-muted-foreground flex flex-row items-center cursor-pointer"
                          onClick={() => {
                            field.onChange(undefined);
                          }}
                        >
                          <TrashIcon className="w-4 h-4 mr-2" />
                          Remove
                        </FormLabel>
                      ) : !isEditing ? (
                        <FormLabel
                          className="text-xs text-muted-foreground flex flex-row items-center cursor-pointer"
                          onClick={() => setIsEditing((state) => !state)}
                        >
                          <Pencil1Icon className="w-4 h-4 mr-2" />
                          Edit
                        </FormLabel>
                      ) : (
                        <FormLabel
                          className="text-xs text-muted-foreground flex flex-row items-center cursor-pointer"
                          onClick={() => setIsEditing((state) => !state)}
                        >
                          Close
                        </FormLabel>
                      )}
                    </div>
                    <FormControl>
                      <ImageField
                        disabled={isLoading}
                        isEditing={isEditing}
                        onChange={(url: string) => field.onChange(url)}
                        setIsEditing={() => setIsEditing((state) => !state)}
                        value={field.value}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex items-center space-x-4">
              <Button disabled={isLoading} size="lg" variant="outline" className="w-full" asChild>
                <Link href="/documents">Back</Link>
              </Button>
              <Button disabled={isLoading} size="lg" type="submit" className="w-full">
                {buttonLabel}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
