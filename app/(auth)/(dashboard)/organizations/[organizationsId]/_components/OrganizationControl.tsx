"use client"

import { useEffect } from "react"
import { useParams } from "next/navigation"
import { useOrganizationList } from "@clerk/nextjs"

const OrganizationControl = () => {
  const params = useParams();
  const { setActive } = useOrganizationList();
  useEffect(() => {
    if (!setActive) return ;
    setActive({
        organization: params.organizationsId as string,
    })
  }, [setActive, params.OrganizationsId])
  return (
    <div>
      
    </div>
  )
}

export default OrganizationControl
