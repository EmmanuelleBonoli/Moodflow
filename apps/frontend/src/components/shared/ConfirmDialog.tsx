import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"

interface ConfirmDialogProps {
    onCancel: () => void
    onConfirm: () => Promise<void>
}

export function ConfirmDialog({onCancel, onConfirm}: ConfirmDialogProps) {
    return (
        <AlertDialog open>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Confirmer l&#39;action</AlertDialogTitle>
                    <AlertDialogDescription>
                        Cette action est permanente. Es-tu sur(e) de vouloir continuer ? account and remove your data
                        from our servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={() => onCancel()}>Annuler</AlertDialogCancel>
                    <AlertDialogAction onClick={() => onConfirm()}>Confirmer</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
