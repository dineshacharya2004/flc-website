import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState, type FunctionComponent } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { type z } from "zod";

import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Password } from "~/components/ui/password";

import { cn } from "~/lib/utils";
import { api } from "~/utils/api";
import { ResetPasswordZ } from "~/zod/authZ";

interface Props {
  className?: string;
}

const Resetpassword: FunctionComponent<Props> = ({ className }) => {
  const router = useRouter();
  const { token } = router.query;
  const [resetPasswordToken, setResetPasswordToken] = useState('');
  const [loading, setLoading] = useState(true);

  const resetPassword = api.auth.resetPassword.useMutation({
    onSuccess: async () => {
      toast.success("Password reset successfully!");
      setLoading(false)
      router.push('/auth/login')
    },
    onError: ({ message }) => {
      toast.dismiss();
      toast.error(message);
    },

  })
  const form = useForm<z.infer<typeof ResetPasswordZ>>({
    resolver: zodResolver(ResetPasswordZ),
    defaultValues: {
      token: "",
      newPassword: ""
    },
  });

  useEffect(() => {
    if (token) {
        // Handle case where token is an array of strings
        const tokenString = Array.isArray(token) ? token[0] : token;
        console.log("token string: ", tokenString);
        setResetPasswordToken(tokenString!);
    }
}, [token]);

useEffect(() => {
    if (resetPasswordToken) {
        console.log("verificationToken: ", resetPasswordToken);
    }
}, [resetPasswordToken]);

  const onSubmit = (values: z.infer<typeof ResetPasswordZ>) => {
    resetPassword.mutate({
      token: resetPasswordToken,
      newPassword: values.newPassword ,
      confirmPassword:values.confirmPassword
    })
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn(className, "space-y-8 ")}
      >
        <FormMessage className="flex justify-center text-center text-3xl text-white ">
          Reset password
        </FormMessage>

        <FormField
          control={form.control}
          name="newPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Password placeholder="Password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Password placeholder="Confirm Password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-center">
          <Button className="bg-yellow-300 hover:bg-yellow-300" type="submit">
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default Resetpassword;
