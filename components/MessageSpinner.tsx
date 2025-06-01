import { getSemiRandomLoadingMessage } from "@/public/functions/frontendConverters"
import { Spinner } from "@nextui-org/react"

export const MessageSpinner = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <Spinner color="secondary" size="lg" />
      <p className="text-gray-400 mt-4 text-lg" suppressHydrationWarning={true}>
        {getSemiRandomLoadingMessage()}
      </p>
    </div>
  )
}