import { OrganizationList } from "@clerk/nextjs";

export default function Organizations() {
    return (
        <OrganizationList 
            hidePersonal
            afterSelectOrganizationUrl="/organizations/:id"
            afterCreateOrganizationUrl="/organizations/:id"
        />
    )
}