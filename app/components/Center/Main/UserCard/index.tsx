import { useIntl } from "react-intl";
import { ModeToggle } from "@/components/ModeToggle";
import VisitorCount from "@/components/Center/Main/VisitorCount";
import { RoleCycle } from "@/components/Center/Main/RoleCycle";

export default function UserCard() {
  const intl = useIntl();

  const roles = [
    intl.formatMessage({ id: "usercard.role.developer" }),
    intl.formatMessage({ id: "usercard.role.fullstack" }),
    intl.formatMessage({ id: "usercard.role.openSource" }),
  ];

  return (
    <div className="grid h-auto w-full grid-cols-[minmax(0,1fr)_auto] items-center gap-3 p-3 sm:gap-6 sm:p-4">
      <div className="flex min-w-0 items-center gap-3 sm:items-end sm:gap-4">
        <div className="relative size-16 shrink-0 sm:size-24">
          <img
            src="/images/avatar/user.png"
            alt="Avatar"
            className="size-full rounded-xl object-cover outline-3 outline-offset-3 sm:rounded-2xl sm:outline-4 sm:outline-offset-4"
          />
        </div>

        <div className="flex min-w-0 flex-col justify-center overflow-hidden sm:justify-end">
          <h2 className="truncate text-lg font-bold tracking-tight sm:text-2xl">
            {intl.formatMessage({ id: "usercard.name" })}
          </h2>
          <div className="mt-1 max-w-full overflow-hidden [&>div]:max-w-full">
            <RoleCycle roles={roles} />
          </div>
        </div>
      </div>

      <div className="flex flex-col items-end justify-between self-stretch">
        <ModeToggle />

        <VisitorCount />
      </div>
    </div>
  );
}
