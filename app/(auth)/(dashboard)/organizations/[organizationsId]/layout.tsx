import { auth } from "@clerk/nextjs"
import OrganizationControl from "./_components/OrganizationControl"
import { startCase } from "lodash"

export async function generateMetadata() {
  const { orgSlug } = auth();

  const formattedOrgSlug = orgSlug ? startCase(orgSlug) : "Organization";

  return {
    title: `Tasko | ${formattedOrgSlug}`,
  };
}

const OrganizationsIdLayout = ({
    children
}: {
    children: React.ReactNode
}) => {
  return (
    <>
      <OrganizationControl />
      {children}
    </>
  )
}

export default OrganizationsIdLayout
