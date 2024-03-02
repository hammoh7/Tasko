import OrganizationControl from "./_components/OrganizationControl"

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
