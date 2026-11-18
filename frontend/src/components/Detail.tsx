import { Typography } from "@mui/material";

interface DetailProps {
    label: string;
    value?: string | null;
}

export default function Detail({ label, value }: DetailProps) {
    return (
        <div>
            <Typography variant="subtitle2" color="text.secondary">
                {label}
            </Typography>
            <Typography>{value ?? "—"}</Typography>
        </div>
    );
}