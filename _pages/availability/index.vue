<template>
    <div>
			<div>
				<div class="tw-flex tw-flex-row tw-p-4 tw-gap-6">
					<div>
						<!--office selector -->
						<h4>Seleccionar oficina:</h4>
					 	<dynamic-field
							v-model="selectedOffice"
							@update:model-value="(value) => getGammaOffice()"
							:field="dynamicFields.offices"						
						/>
					</div>
					<div>
						<!-- date -->
						<h4>Fecha de comienzo:</h4>
						<dynamic-field
							v-model="selectedDate"
							@update:model-value="(value) => getDailyAvailabilities()"
							:field="dynamicFields.date"
						/>
					</div>
				</div>

				

				<div class="tw-flex tw-flex-row tw-p-4 tw-gap-6" >
					
					<div v-if="gammaOffice.length && !loading">
							
							<div class="tw-flex tw-flex-row tw-gap-x-2" >
								<div class="tw-w-[150px]">{{ title }}</div>

								<template v-for="(day, index) in nextDays ">
									<div class="tw-w-[40px]">
										{{ day.label }}
										<br/>
										{{ day.date }}
									</div>
								</template>					
							</div>
						
						

						<template v-for="(item, index) in gammaOffice ">
							<div class="tw-flex tw-flex-row tw-gap-x-2" >
								<div class="tw-w-[150px]">
									<h4>
										{{ item.gamma.title }}
									</h4>
									<p>
										{{ item.gamma.summary }}
									</p>
								</div>

								<template v-for="(day, index) in nextDays ">
									<div>
										<template v-for="(available, index) in getAvailability(item.id, day.fullDate) ">
											<div>
												<p>{{ available.reservedQuantity }} / {{ available.quantity }} </p>
											</div>
										</template>
									</div>
								</template>
							</div>
						</template>
						
					</div>

				</div>

			</div>			
			<!--inner loading-->
		<inner-loading :visible="loading" />
    </div>
</template>
<script lang="ts">
import {defineComponent}  from 'vue'
import controller from 'modules/qrentcar/_pages/availability/controller'

export default defineComponent({
  setup(props, {emit}) {
    return controller(props, emit)
  }
})
</script>
