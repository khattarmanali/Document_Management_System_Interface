import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { FormProvider as Form } from "react-hook-form";

// ----------------------------------------------------------------------

export default function FormProvider({
  children,
  onSubmit,
  methods,
  ...other
}) {
  const [formWidth, setFormWidth] = useState("100%");

  useEffect(() => {
    // Update form width based on window width
    const handleResize = () => {
      setFormWidth(window.innerWidth >= 768 ? "90%" : "100%");
    };

    // Initial call to set form width
    handleResize();

    // Attach event listener for window resize
    window.addEventListener("resize", handleResize);

    // Cleanup event listener on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Form {...methods} {...other} style={{ width: "100%" }}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        {...other}
        style={{ width: formWidth }}
      >
        {children}
      </form>
    </Form>
  );
}

FormProvider.propTypes = {
  children: PropTypes.node,
  methods: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

FormProvider.defaultProps = {
  children: null,
};
