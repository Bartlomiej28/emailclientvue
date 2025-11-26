import { ID, Query } from 'appwrite';
import { useRuntimeConfig } from '#imports';
import { account, databases } from '../utils/appwrite';

export function useAppwrite() {
  return useNuxtApp().$appwrite;
}

export async function HandleSignUp({email, password, name}: {email: string, password: string, name: string}) {
  try {
    const newUser = await account.create(ID.unique(), email, password, name);
    await account.createEmailPasswordSession(email, password);

    const config = useRuntimeConfig();
    await databases.createDocument(
      config.public.appwriteDatabaseId,
      config.public.appwriteUsersCollectionId,
      ID.unique(),
      {
        userId: newUser.$id, 
        email: email,
        name: name
      }
    );

    return { success: true };
  } catch (err: any) {
    return { success: false, error: err?.message || 'Błąd rejestracji' };
  }
}

export async function HandleSignOut() {
  try {
    await account.deleteSession('current');
    return { success: true };
  } catch (error) {
    return { success: false };
  }
}


export async function HandleSignIn({ email, password }: { email: string, password: string }) {
  const { account } = useAppwrite();

  try {
    const session = await account.createEmailPasswordSession(email, password);
    return { success: true, account: session };
  } catch (err: any) {
    return { success: false, error: err?.message };
  }
}

export async function GetCurrentUser() {
  if (process.server) return null;

  const { account } = useAppwrite();

  try {
    return await account.get();
  } catch {
    return null;
  }
}

export async function handleGetEmails({userEmail}: {userEmail: string}){

    try {
        const emails = await databases.listDocuments(
            '6920af6c0015cd20be3e',
            'emails',
            [
              Query.equal('emailTo', userEmail),
              Query.equal('visibleToRecipient', true),
              Query.orderDesc('$createdAt'),
            ]
          
        )
       return emails.documents

    } catch (error) {
        console.log('Get emails error. Try again later.')
        return []
    }
}

export async function handleGetEmailById(id: string){
  try {
        const email = await databases.getDocument(
        '6920af6c0015cd20be3e',
        'emails',
        id
    )
    console.log(email)
    return email

    } catch (error) {
        console.log('Get email by id error. Try again later.', error)
    }

}

export async function handleSendEmail(data: { to: string; subject: string; content: string; authorName: string; authorEmail: string }) {
    try {

        const DATABASE_ID = '6920af6c0015cd20be3e'; 
        const COLLECTION_ID = 'emails'; 
        const result = await databases.createDocument(
            DATABASE_ID,
            COLLECTION_ID,
            ID.unique(),
            {
                emailAuthor: data.authorName,  
                emailAuthorEmail: data.authorEmail,    
                emailTo: data.to,           
                emailSubject: data.subject, 
                emailText: data.content,    
            }
        );

        return { success: true, data: result };
    } catch (error: any) {
        console.error("Sending Email error. Try again later.", error);
        return { success: false, error: error.message };
    }
}

export async function handleSearch(title: string) {
  try {
    const res = await databases.listDocuments(
      '6920af6c0015cd20be3e',
      'emails',
      [
        Query.search("emailSubject", title), 
        Query.orderDesc("$createdAt") 
      ]
    );

    return res;
  } catch (error) {
    console.error("Search emails error. Try again later", error);
    return { documents: [], total: 0 };
  }
}

export async function markEmailAsRead(id: string) {
    try {
        await databases.updateDocument(
            '6920af6c0015cd20be3e',
            'emails',
            id,
            {
                isRead: true
            }
        );
    } catch (error) {
        console.error("Error marking the email as read. Try again later.", error);
    }
}

export async function handleDeleteEmail(mailId: string, currentUserEmail: string) {
    try {
        const DATABASE_ID = '6920af6c0015cd20be3e';
        const COLLECTION_ID = 'emails';

        const mail = await databases.getDocument(DATABASE_ID, COLLECTION_ID, mailId);

        const updates: any = {};

        if (mail.emailTo === currentUserEmail) {
            updates.visibleToRecipient = false;
        }
        
        if (mail.emailAuthor === currentUserEmail) { 
            updates.visibleToSender = false;
        }

        if (Object.keys(updates).length > 0) {
            await databases.updateDocument(
                DATABASE_ID,
                COLLECTION_ID,
                mailId,
                updates
            );
            
            return { success: true };
        }

        return { success: false, error: "You do not have permission for this email." };

    } catch (error: any) {
        console.error("Delete error:", error);
        return { success: false, error: error.message };
    }
}

export async function handleGetTrashEmails(userEmail: string) {
    try {
        const result = await databases.listDocuments(
            '6920af6c0015cd20be3e', 
            'emails',               
            [
                Query.equal('emailTo', userEmail),
                Query.equal('visibleToRecipient', false), 
                Query.orderDesc('$createdAt')
            ]
        );
        return result.documents;
    } catch (error) {
        console.error("Error fetching the trash. Try again later.", error);
        return [];
    }
}

export async function handleRestoreEmail(mailId: string) {
    try {
        await databases.updateDocument(
            '6920af6c0015cd20be3e',
            'emails',
            mailId,
            {
                visibleToRecipient: true 
            }
        );
        return { success: true };
    } catch (error) {
        console.error("Restore email error. Try again later.", error);
        return { success: false };
    }
}

export async function handleGetSentEmails(userEmail: string) {
    try {


        const result = await databases.listDocuments(
            '6920af6c0015cd20be3e', 
            'emails',               
            [
                Query.equal('emailAuthorEmail', userEmail),
                Query.equal('visibleToSender', true), 
                Query.orderDesc('$createdAt')
            ]
        );
        return result.documents;
    } catch (error) {
        console.error("Error fetching sent emails. Try again later.", error);
        return [];
    }
}