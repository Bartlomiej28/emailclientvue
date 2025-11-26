<template>
    <aside class="main__sidebar">
      <RouterLink to="/write" style="color: white">
        <div class="main__sidebar-logo">
            <MailPlus :size="15" />
        </div>
      </RouterLink>
        <button 
            v-for="item in data.navMain" 
            :key="item.title" 
            class="main__sidebar-button" 
            data-bs-toggle="tooltip"
            :title="item.title" 
            data-bs-placement="right" 
            data-bs-custom-class="main__sidebar-tooltip-arrow" 
            @click="handleNavClick($event, item)"
        >
          <component :is="item.icon" :size="15" />

      </button>
        <Avatar :label="avatarLetter" class="main__sidebar-avatar" size="large" @click="toggleUserMenu"/>
        <div v-if="showUserMenu" class="user-menu">
        <p class="user-email">{{ currentUserEmail }}</p>
        <button class="logout-btn" @click="handleLogout">Wyloguj</button>
      </div>
      </aside>

</template>

<script setup>
import { ArchiveX, Command, File, Inbox, Send, Trash2, MailPlus } from "lucide-vue-next"
import { useRouter } from "vue-router";
import Avatar from "primevue/avatar";
import { ref, computed, onMounted } from "vue";
import { GetCurrentUser, HandleSignOut } from "~~/lib/api";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Inbox",
      url: "#",
      icon: Inbox,
      isActive: true,
      link: '/home'
    },
    {
      title: "Sent",
      url: "#",
      icon: Send,
      isActive: false,
      link: '/sent'
    },
    {
      title: "Junk",
      url: "#",
      icon: ArchiveX,
      isActive: false,
      link: '/junk'
    },
    {
      title: "Trash",
      url: "#",
      icon: Trash2,
      isActive: false,
      link: '/trash'
    },
  ]
}
/*
{
      title: "Drafts",
      url: "#",
      icon: File,
      isActive: false,
      link: '/drafts'
    },
*/

const router = useRouter();
const globalToastState = useState('globalToastState');
const emit = defineEmits(['close-sidebar']);

const handleNavClick = (event, item) => {
    if (item.title === 'Junk') {
        event.preventDefault();
        globalToastState.value = {
            title: 'Funkcja niedostępna',
            message: 'Ta funkcja jest jeszcze niedostępna.'
        };
        emit('close-sidebar');
    }else{
      router.push(item.link);
      emit('close-sidebar');
    }
}

const currentUser = ref(null);
const currentUserEmail = computed(() => currentUser.value?.email ?? "");
const avatarLetter = computed(() =>
  currentUserEmail.value ? currentUserEmail.value.charAt(0).toUpperCase() : "?"
);

const showUserMenu = ref(false);

const toggleUserMenu = () => {
  showUserMenu.value = !showUserMenu.value;
};

const handleLogout = async () => {
  const res = await HandleSignOut();

  if (res.success) {
    router.push("/sign-in");
  }
};

onMounted(async () => {
  const user = await GetCurrentUser();
  if (user) currentUser.value = user;

  const { Tooltip } = await import('bootstrap')

  document.querySelectorAll('[data-bs-toggle="tooltip"]').forEach(el => {
    new Tooltip(el)
  })
})

</script>

<style scoped>
.main__sidebar-avatar-wrapper {
  margin-top: auto;
  position: relative;
}

.user-menu {
  position: absolute;
  bottom: 0rem;
  left: 6rem;
  background-color: white;
  padding: 12px;
  border-radius: 8px;
  width: auto;
  display: flex;
  flex-direction: column;
  gap: 8px;
  border: 1px solid #444;
  z-index: 20;
}

.user-email {
  font-size: 14px;
  margin: 0;
}

.logout-btn {
  background: #d9534f;
  border: none;
  padding: 6px 10px;
  color: white;
  border-radius: 6px;
  cursor: pointer;
  text-align: left;
}

.logout-btn:hover {
  background: #c9302c;
}
</style>