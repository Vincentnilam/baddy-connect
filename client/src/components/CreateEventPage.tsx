import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router";
import { CreateEventForm } from "../types/CreateEventForm";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#252525",
      paper: "#1E1E1E",
    },
    primary: {
      main: "#3b82f6",
    },
    text: {
      primary: "#fff",
      secondary: "#aaa",
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: "#1E1E1E",
        },
      },
    },
  },
});

const dateTimeSlotProps = {
  textField: {
    fullWidth: true,
    variant: "standard" as const,
    InputProps: {
      disableUnderline: true,
      sx: {
        color: "white",
        fontSize: "0.9rem",
        px: 2,
        pt: "24px",
        pb: "8px",
        borderBottom: "1px solid #374151",
        "&.Mui-focused": {
          borderBottom: "1px solid #3b82f6",
        },
      },
    },
    InputLabelProps: {
      shrink: false,
      sx: {
        color: "#6B7280",
        fontSize: "0.95rem",
        top: "38px",
        left: "18px",
        position: "absolute",
        transformOrigin: "top left",
        transform: "translate(0, 0) scale(1)",
        transition: "all 0.2s ease-out",
        "&.Mui-focused, &.MuiFormLabel-filled": {
          transform: "translate(0, -12px) scale(0.85)",
        },
      },
    },
  },
};


const CreateEventPage: React.FC = () => {
  const navigate = useNavigate();
  const [showDescription, setShowDescription] = useState(false);
  const [isPublic, setIsPublic] = useState(true);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm<CreateEventForm>({
    defaultValues: {
      isPublic: true,
    }
  });

  const onSubmit = async (data: CreateEventForm) => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_APP_URL}/events`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Failed to create event");
      navigate("/dashboard");
    } catch (err) {
      console.error("Event creation error: ", err);
    }
  };

  const handleVisibilityToggle = (value: boolean) => {
    setIsPublic(value);
    setValue("isPublic", value);
  };

  const inputStyle =
    "peer w-full px-5 pt-6 pb-2 bg-transparent border-b border-gray-700 text-white placeholder-transparent focus:outline-none focus:border-blue-500";
  const labelStyle =
    "absolute left-4 text-gray-500 text-base transition-all px-1 pointer-events-none";

  return (
    <ThemeProvider theme={darkTheme}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <div className="min-h-screen bg-[#252525] flex items-center justify-center px-4 py-12 text-white">
          <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-2xl space-y-8">
            <h2 className="text-3xl font-bold text-center mb-6">Create a New Event</h2>

            {/* Title */}
            <div className="relative">
              <input {...register("title", { required: true })} className={inputStyle} placeholder="Title" />
              <label className={`${labelStyle} ${"top-2 text-sm peer-placeholder-shown:top-5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-2 peer-focus:text-sm peer-focus:text-blue-400"}`}>
                Title
              </label>
              {errors.title && <p className="text-red-500 text-sm mt-1 px-4">Title is required</p>}
            </div>

            {/* Location */}
            <div className="relative">
              <input {...register("location", { required: true })} className={inputStyle} placeholder="Location" />
              <label className={`${labelStyle} ${"top-2 text-sm peer-placeholder-shown:top-5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-2 peer-focus:text-sm peer-focus:text-blue-400"}`}>
                Location
              </label>
              {errors.location && <p className="text-red-500 text-sm mt-1 px-4">Location is required</p>}
            </div>

            {/* Start Date */}
            <Controller
              control={control}
              name="startDate"
              rules={{ required: true }}
              render={({ field }) => (
                <DateTimePicker label="Start Date & Time" {...field} slotProps={dateTimeSlotProps} />
              )}
            />
            {errors.startDate && <p className="text-red-500 text-sm mt-1 px-4">Start date is required</p>}

            {/* End Date */}
            <Controller
              control={control}
              name="endDate"
              rules={{ required: true }}
              render={({ field }) => (
                <DateTimePicker label="End Date & Time" {...field} slotProps={dateTimeSlotProps} />
              )}
            />
            {errors.endDate && <p className="text-red-500 text-sm mt-1 px-4">End date is required</p>}

            {/* Max Players & Court Count */}
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="relative">
                <input type="number" {...register("maxPlayers", { required: true, min: 1 })} className={inputStyle} placeholder="Max Players" />
                <label className={`${labelStyle} ${"top-2 text-sm peer-placeholder-shown:top-5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-2 peer-focus:text-sm peer-focus:text-blue-400"}`}>
                  Max Players
                </label>
                {errors.maxPlayers && <p className="text-red-500 text-sm mt-1 px-4">Must be at least 1</p>}
              </div>

              <div className="relative">
                <input type="number" {...register("courtCount", { required: true, min: 1 })} className={inputStyle} placeholder="Court Count" />
                <label className={`${labelStyle} ${"top-2 text-sm peer-placeholder-shown:top-5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-2 peer-focus:text-sm peer-focus:text-blue-400"}`}>
                  Court Count
                </label>
                {errors.courtCount && <p className="text-red-500 text-sm mt-1 px-4">Must be at least 1</p>}
              </div>
            </div>

            {/* Price */}
            <div className="relative">
              <input type="number" step="1" {...register("price", { required: true, min: 0 })} className={inputStyle} placeholder="Price" />
              <label className={`${labelStyle} ${"top-2 text-sm peer-placeholder-shown:top-5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-2 peer-focus:text-sm peer-focus:text-blue-400"}`}>
                Price ($)
              </label>
              {errors.price && <p className="text-red-500 text-sm mt-1 px-4">Price must be 0 or more</p>}
            </div>

            {/* Description */}
            <div>
              <button
                type="button"
                onClick={() => setShowDescription(!showDescription)}
                className="text-sm text-blue-400 hover:underline"
              >
                {showDescription ? "Hide Description" : "+ Add Description"}
              </button>
              {showDescription && (
                <textarea
                  {...register("description")}
                  placeholder="Optional description..."
                  className="mt-2 w-full px-4 py-3 bg-[#252525] border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              )}
            </div>

            {/* Visibility */}
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-400">Event Visibility:</span>
              <div className="flex items-center gap-2 bg-[#1A1A1A] p-1 rounded-full">
                <button
                  type="button"
                  onClick={() => handleVisibilityToggle(true)}
                  className={`px-4 py-1 text-sm rounded-full transition font-medium ${
                    isPublic ? "bg-blue-600 text-white" : "text-gray-300"
                  }`}
                >
                  Public
                </button>
                <button
                  type="button"
                  onClick={() => handleVisibilityToggle(false)}
                  className={`px-4 py-1 text-sm rounded-full transition font-medium ${
                    !isPublic ? "bg-blue-600 text-white" : "text-gray-300"
                  }`}
                >
                  Private
                </button>
              </div>
            </div>

            {/* Submit */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-xl font-semibold text-lg transition disabled:opacity-50"
              >
                {isSubmitting ? "Creating..." : "Create Event"}
              </button>
            </div>
          </form>
        </div>
      </LocalizationProvider>
    </ThemeProvider>
  );
};

export default CreateEventPage;
