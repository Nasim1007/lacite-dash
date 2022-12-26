<b-card>
<b-col>
  <b-button
      v-ripple.400="'rgba(255, 159, 67, 0.15)'"
      v-b-modal.modal-warning
      variant="outline-warning"
  >
    Add
  </b-button>
</b-col>
<b-table responsive="sm" :items="items"/>
<b-modal id="modal-warning" ok-only ok-variant="warning" ok-title="Сохранить" modal-class="modal-warning"
         centered title="Warning Modal"
>
  <label for="input-default">Название Бренда</label>

  <label for="brand-img">Лого бренда</label>

</b-modal>

</b-card>
