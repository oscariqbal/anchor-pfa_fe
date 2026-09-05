// ui components
import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"

// custom components
import DestroyTransactionDialog from "@/features/transactions/destroy-transaction-dialog";

// icons
import { SquarePen } from 'lucide-react';

// others
import Link from "next/link";

export default function ActionButtonGroup ({id, className}: {id: number, className?: string}) {
  return (
    <div className={className}>
      <ButtonGroup>
        <ButtonGroup>
          <Button variant="outline" className="cursor-pointer gap-2" asChild>
            <Link href={`/transactions/${id}/edit`}>
              <SquarePen data-icon="inline-start" className="size-4"/>
              Edit
            </Link>
          </Button>
        </ButtonGroup>
        <ButtonGroup>
          <DestroyTransactionDialog id={id} />
        </ButtonGroup>
      </ButtonGroup>
    </div>
  )
}