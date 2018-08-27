<template>
    <div class="col-sm-3">
        <ul class="nav flex-column">
            <li class="nav-item">
                <router-link :to="{name: 'AdminCategories'}">
                    Категории
                </router-link>
            </li>
            <li class="nav-item">
                <router-link :to="{name: 'AdminForums'}">
                    Форумы
                </router-link>
            </li>
            <li class="nav-item">
                <router-link :to="{name: 'AdminThreads'}">
                    Ветки
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    
}
</script>
