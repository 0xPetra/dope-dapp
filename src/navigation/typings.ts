export type Routes = {
  // TODO: Fix for functions with props
  component: React.FC;
  path: string;
  name: string;
  icon?: string;
  options?: {
    headerShown: boolean;
    gestureEnabled?: boolean;
  };
}[];
