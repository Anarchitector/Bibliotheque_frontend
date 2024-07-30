interface LabelProps {
    value: string;
    checked: boolean;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    name: string;
  }