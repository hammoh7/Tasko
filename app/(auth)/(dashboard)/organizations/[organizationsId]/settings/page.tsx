import { OrganizationProfile } from "@clerk/nextjs";

const Settings = () => {
    return (
        <div className="w-full ml-16 mr-16">
            <OrganizationProfile 
                appearance={{
                    elements: {
                        rootBox: {
                            boxShadow: "none",
                            width: "100%"
                        },
                        card: {
                            boxShadow: "none",
                            width: "100%",
                            height: "100%"
                        }
                    }
                }}
            />
        </div>
    )
}

export default Settings;