
import { toast } from "@/hooks/use-toast";

export const showToast = (
  title: string, 
  description?: string, 
  variant?: "default" | "destructive"
) => {
  toast({
    title,
    description,
    variant: variant || "default",
    duration: 3000,
  });
};

export const showAlertSubscriptionToast = () => {
  showToast(
    "Match Alerts Activated",
    "You'll receive notifications for upcoming matches and live scores"
  );
};

export const showTicketBookingToast = (matchDetails?: string) => {
  showToast(
    "Booking Initiated",
    matchDetails 
      ? `Processing your request for ${matchDetails}` 
      : "Processing your ticket request"
  );
};

export const showTeamSelectionToast = (teamName: string) => {
  showToast(
    `${teamName} Selected`,
    `You've selected ${teamName} as your team to follow`
  );
};
