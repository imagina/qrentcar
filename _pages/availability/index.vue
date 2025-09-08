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
						<!-- date selector -->
						<h4>Fecha de comienzo:</h4>
						<dynamic-field
							v-model="selectedDate"
							@update:model-value="(value) => getDailyAvailabilities()"
							:field="dynamicFields.date"
						/>
					</div>
				</div>

				

				<div class="">					
					<div v-if="gammaOffice.length && !loading && selectedDate" class=" tw-overflow-x-auto"   >

						<template v-for="(item, index) in gammaOffice ">
							<div class="tw-flex">
								<div class="tw-flex-1">
									<span v-if="item?.gamma">
										{{ item.gamma.title }}
									</span>
									<span v-else>
										{{ title }}
									</span>
									<p v-if="item?.gamma">
										{{ item.gamma.summary }}
									</p>
								</div>							
																	

								
								<template v-for="(day, index) in nextDays ">

									<div 
										v-if="item?.gamma" 
										class="tw-w-[200px] tw-items-center tw-justify-items-center"
									>	
										
											<div class="tw-text-center">
												{{ getAvailability(item, day.fullDate).reservedQuantity }}
											</div>
											<div class="tw-border-t-2  tw-border-t-gray-500 tw-w-[30px] tw-mx-4">
											</div>
													<q-popup-proxy 
														:cover="false" 
														anchor="bottom start"
														transition-show="fade-in" 
														transition-hide="fade-out"
														max-width="600px" ref="popupProxy"
														@before-show="() => {
															setAvailabilityModal(getAvailability(item, day.fullDate))
														}"
													>
														<div class="q-pa-md relative-position bg-white" >
														<!-- Title -->
														<b class="text-blue-grey">
															{{ item.gamma.title }} : {{ day.fullDate }}
														</b>
														<q-separator class="q-mt-sm" />
															<!-- Form -->
															<q-form autocorrect="off" autocomplete="off" @submit="updateAvailability(getAvailability(item, day.fullDate))"
																			@validation-error="$alert.error($tr('isite.cms.message.formInvalid'))">
																<div class="q-py-sm">
																	<!-- Field -->
																	<dynamic-field v-model="modelValues.quantity" :field="dynamicFields.quantity" />
																	<dynamic-field v-model="modelValues.price" :field="dynamicFields.price" />
																	<!--Actions-->
																	<div class="justify-end row q-gutter-sm">
																		<q-btn :label="$tr('isite.cms.label.cancel')"
																					no-caps color="grey" unelevated rounded v-close-popup />
																		<q-btn :label="$tr('isite.cms.label.save')" color="green"
																					no-caps unelevated rounded v-close-popup type="submit" />
																	</div>
																</div>
															</q-form>
															<!-- Loading -->
															<inner-loading :visible="loading" />
														</div>
													</q-popup-proxy>
											

											<div class="tw-text-center">
												{{ getAvailability(item, day.fullDate, 'quantity').quantity }}
											</div>
											<div class="tw-text-[11px] tw-text-center tw-bg-amber-200">
												{{ getAvailability(item, day.fullDate).price || 0 }}
											</div>
										
									</div>

									<div v-else class="tw-w-[200px]">
										<div class="tw-text-center">
											{{ day.label }}
										</div>
										<div class="tw-text-center">
											{{ day.date }}
										</div>
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
import editablePopup from 'modules/qsite/_components/master/editablePopup';

export default defineComponent({
  setup(props, {emit}) {
    return controller(props, emit)
  },
  components: {
    editablePopup    
  },
})
</script>
