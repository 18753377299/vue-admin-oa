<template>
    <div>
    　　<div class="title">
    　　　<slot name="title"></slot>
    　　</div>
    　　<div class="content">
    <!--　　　<slot name="content"></slot>-->
        <!--<slot> 标签允许有一个匿名 slot，不需要有 name 值，
        找不到内容匹配的片段将会插入到该位置-->
           <slot></slot>
    　　</div>
    </div>
</template>
<script>

</script>
<style>

</style>
