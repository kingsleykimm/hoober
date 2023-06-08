import React, {useState} from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';


import * as Tabs from "@radix-ui/react-tabs"

function DialogDemo() {
    const [newUsername, setNewUsername] = useState("")
    const [newPassword, setNewPassword] = useState("")
    return (
        <Dialog.Root>
        <Dialog.Trigger asChild>
            <button className="Button violet">Edit profile</button>
        </Dialog.Trigger>
        <Dialog.Portal>
            <Dialog.Overlay className="DialogOverlay" />
            <Dialog.Content className="DialogContent">
                <Dialog.Title className="DialogTitle">Edit profile</Dialog.Title>
                <Dialog.Description className="DialogDescription">
                    Make changes to your profile here. Click save when you're done.
                </Dialog.Description>
                <Tabs.Root className="TabsRoot" defaultValue="tab1">
                    <Tabs.List className="TabsList" aria-label="Manage your account">
                        <Tabs.Trigger className="TabsTrigger" value="tab1">
                            Account
                        </Tabs.Trigger>
                        <Tabs.Trigger className="TabsTrigger" value="tab2">
                            Password
                        </Tabs.Trigger>
                    </Tabs.List>
                    <Tabs.Content className="TabsContent" value="tab1">
                        <fieldset className="Fieldset">
                            <label className="Label" htmlFor="name">
                                Name
                            </label>
                            <input className="Input" id="name" placeholder="name" required/>
                        </fieldset>
                        <fieldset className="Fieldset">
                            <label className="Label" htmlFor="username">
                                Username
                            </label>
                            <input className="Input" type="text" id="username" placeholder="username" required/>
                        </fieldset>
                        <div style={{ display: 'flex', marginTop: 25, justifyContent: 'flex-end' }}>
                            <Dialog.Close asChild>
                                <button className="Button green">Save changes</button>
                            </Dialog.Close>
                        </div>
                    </Tabs.Content>
                    <Tabs.Content className="TabsContent" value="tab2">
                        <p className="Text">Change your password here. After saving, you'll be logged out.</p>
                        <fieldset className="Fieldset">
                            <label className="Label" htmlFor="currentPassword">
                                Current password
                            </label>
                            <input className="Input" id="currentPassword" type="password" />
                        </fieldset>
                        <fieldset className="Fieldset">
                            <label className="Label" htmlFor="newPassword">
                                New password
                            </label>
                            <input className="Input" id="newPassword" type="password" />
                        </fieldset>
                        <fieldset className="Fieldset">
                            <label className="Label" htmlFor="confirmPassword">
                                Confirm password
                            </label>
                            <input className="Input" id="confirmPassword" type="password" />
                        </fieldset>
                        <div style={{ display: 'flex', marginTop: 20, justifyContent: 'flex-end' }}>
                            <button className="Button green">Change password</button>
                        </div>
                    </Tabs.Content>
                </Tabs.Root>


                <Dialog.Close asChild>
                    <button className="IconButton" aria-label="Close">
                        <Cross2Icon />
                    </button>
                </Dialog.Close>
            </Dialog.Content>
        </Dialog.Portal>
    </Dialog.Root>
    )
}


export default DialogDemo;
