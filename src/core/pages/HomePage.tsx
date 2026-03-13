import { cn } from "@/core/lib/utils";
import { DataAttribution } from "@/core/components/DataAttribution";

/**
 * HomePage Props
 * Game implementations can provide their own logo, version, and demo data handlers
 */
interface HomePageProps {
  logo?: string;
  appName?: string;
  version?: string;
  onLoadDemoData?: () => Promise<void>;
  onClearData?: () => Promise<void>;
  checkExistingData?: () => Promise<boolean>;
  demoDataDescription?: string;
  demoDataStats?: string;
}

const HomePage = ({
  logo,
  appName = "Maneuver",
  version = "1.0.0",
}: HomePageProps = {}) => {

  return (
    <main className="relative h-screen w-full">
      <div
        className={cn(
          "flex flex-col h-screen w-full justify-center items-center gap-6 2xl:pb-6",
          "bg-size-[40px_40px]",
          "bg-[linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)]",
          "dark:bg-[linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]"
        )}
      >
        <div className="flex flex-col w-auto justify-center items-center gap-6 scale-75 md:scale-75 lg:scale-100">
          {logo ? (
            <img
              src={logo}
              width="600"
              height="240"
              alt={`${appName} Logo`}
              className="dark:invert"
            />
          ) : (
            <div className="text-4xl font-bold">{appName}</div>
          )}
          <div className="text-center space-y-2">
            <p>
              <strong>Version</strong>: {version}
            </p>
            <DataAttribution sources={['tba', 'nexus']} variant="compact" />
          </div>
        </div>
      </div>
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white mask-[radial-gradient(ellipse_at_center,transparent_70%,black)] dark:bg-black"></div>
    </main>
  );
};

export default HomePage;
