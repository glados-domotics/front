<template>
  <div class="flex flex-col gap-5 h-full overflow-hidden">
    <h1 class="text-indigo-600 font-bold text-2xl">Dashboard</h1>
    <sidebar-list full-height>
      <template #sidebar>
        <details
          open
          v-for="room in orderedListByRoom"
          :key="room.id">
          <summary class="unselectable">
            {{ room.name }}
          </summary>
          <ul class="pl-4">
            <li
              @click="selectEntity(entity.id)"
              class="card-item rounded-md p-2 border-2 mb-2 flex flex-row justify-between cursor-pointer"
              :class="{'selected': selectedEntity?.id === entity.id}"
              v-for="entity in room.entities"
              :key="entity.id">
              <div class="flex-auto unselectable">{{ entity.name }}</div>
              <div class="flex-initial">
                <svg
                  class="status-button"
                  :class="entity.status"
                  style="width:24px;height:24px"
                  viewBox="-5 -5 34 34">
                  <path
                    fill="currentColor"
                    d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" />
                </svg>
              </div>
            </li>

            <!-- TEST for many cards (scroll, layout etc.) -->
            <!-- <li
              class="card-item rounded-md p-2 border-2 mb-2 flex flex-row justify-between cursor-pointer"
              v-for="entity in 5"
              :key="entity">
              <div class="flex-auto">Light</div>
              <div class="flex-initial">
                <svg
                  class="status-button off"
                  style="width:24px;height:24px"
                  viewBox="-5 -5 34 34">
                  <path
                    fill="currentColor"
                    d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" />
                </svg>
              </div>
            </li> -->

          </ul>
        </details>
      </template>
      <template #content>
        <p>{{ selectedEntity }}</p>
      </template>
    </sidebar-list>
  </div>
</template>

<script>
import SidebarList from "@/components/dashboard/SidebarList"

export default {
  name: "Dashboard",
  components: { SidebarList },
  mounted() {
    this.getEntities()
  },
  data() {
    return {
      isLoading: false,
      isError: false,
    }
  },
  methods: { 
    getEntities() {
      this.isLoading = true

      this.$store.dispatch("fetchEntities")
        .then(() => {})   // the store resolve(res) the value of the XHR - just in case
        .catch((err) => {
          this.isError = true
          console.warn(err)
        })
        .finally(() => {
          this.isLoading = false
        })
    },
    selectEntity(entityId){
      let entity = this.entities.find(e => e.id === entityId)
      if (entity){
        this.selectedEntity = entity
      } else {
        console.warn("No entity found for this ID - " + entityId)
      }
    }
  },
  computed: {
    entities: {
      get(){
        return this.$store.state.entities
      },
      set(value){
        this.$store.dispatch("saveEntity", value)
      },
    },
    orderedListByRoom(){
      return this.$store.getters.getNestedEntities
    },
    selectedEntity:{
      get(){
        return this.$store.state.selectedEntity
      },
      set(newVal){
        this.$store.commit("SET_SELECTED_ENTITY", newVal)
      }
    }
  } 
}
</script>


<style lang="scss" scoped>
$selected: #a1c4fd;
$bRadius: 6px;
$mid-grey-darker: #777;

.status-button{
  &.on{ color: #009900; }
  &.unavailable{ color: #FF0800; }
  &.off{ color: #FFC72C; }
}
.card-item{
  border-color: $selected;
  &.selected{
    // background-color: $selected;
    background-image: linear-gradient(120deg, $selected 0%, #c2e9fb 100%);
    color: #333;
  }
}
details{
  border-top-left-radius: $bRadius;
  margin: 0 0 .8rem;
  padding: 0;
  position: relative;

  summary{
    list-style-type: none;

    // Not good for a11y, but the exercice is just for showing off, isn't? ;)
    &:focus, &:active{
      outline: none;
    }

    // Remove the default arrow
    &::marker {
      display: none;
    }
    // replace the arrow with a custom SVG
    &:before{
      $arrowSize: 20px;
      content: "";
      display: inline-block;
      background: transparent url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' style='width:24px;height:24px' viewBox='0 0 24 24'%3E%3Cpath fill='currentColor' d='M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z' /%3E%3C/svg%3E") 0 5px / contain no-repeat;
      width: $arrowSize;
      height: $arrowSize;
      margin-left: -6px;
      margin-right: 8px;
    }

    border-radius: $bRadius;
    padding-bottom: 0.4rem;
    padding-top: 0;
    color: #333;
    font-weight: 700;
    cursor: pointer;
  }

  &[open]{
    position: relative;

    // change the arrow
    & > summary:before{
      background: transparent url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' style='width:24px;height:24px' viewBox='0 0 24 24'%3E%3Cpath fill='currentColor' d='M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z' /%3E%3C/svg%3E") 0 5px / contain no-repeat;
    }
    // Add a line, like file hierarchy in VsCode
    &:before{
      content: "";
      position: absolute;
      z-index: 19;
      width: 1px;
      background-color: #C9C9C9;
      top: 26px;
      left: 2px;
      height: calc(100% - 26px);
    }
  }
}
</style>