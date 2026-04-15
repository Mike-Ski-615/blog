import { Separator } from "@/components/ui/separator";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Fragment } from "react";
import { useIntl } from "react-intl";

type ThreeTabsProps = {
  slug: string;
};

export default function ThreeTabs({ slug }: ThreeTabsProps) {
  const intl = useIntl();
  const tabs = [
    {
      value: "overview",
      label: intl.formatMessage({ id: "projectDetail.overview" }),
    },
    {
      value: "readme",
      label: intl.formatMessage({ id: "projectDetail.readme" }),
    },
    {
      value: "website",
      label: intl.formatMessage({ id: "projectDetail.website" }),
    },
  ];

  return (
    <TabsList
      aria-label={intl.formatMessage({ id: "projectDetail.tabsLabel" })}
      variant="line"
      className="flex h-9 w-full min-w-0 rounded-none bg-transparent p-0 px-1.5 text-foreground"
    >
      {tabs.map((tab, index) => (
        <Fragment key={`${slug}-${tab.value}`}>
          {index > 0 && <Separator orientation="vertical" />}
          <TabsTrigger
            value={tab.value}
            className="min-w-0 flex-1 basis-0 rounded-none data-active:bg-transparent data-active:text-foreground dark:data-active:bg-transparent"
          >
            {tab.label}
          </TabsTrigger>
        </Fragment>
      ))}
    </TabsList>
  );
}
