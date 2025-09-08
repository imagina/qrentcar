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
					<div v-if="gammaOffice.length > 1 && !loading && selectedDate" class=" tw-overflow-x-auto tw-py-4">
						<template v-for="(item, index) in gammaOffice ">
							<div class="tw-grid tw-grid-flow-col">
								<div class="tw-w-[160px] tw-border-2 tw-p-2">
									<span v-if="item?.gamma">
										{{ item.gamma.title }}
									</span>

									<p v-if="item?.gamma">
										{{ item.gamma.summary }}
									</p>
								</div>

								<template v-for="(day, index) in nextDays ">
									<div
										v-if="item?.gamma"
										class="tw-w-[100px] tw-items-center tw-justify-items-center tw-border-2 tw-p-2 tw-cursor-pointer hover:tw-bg-gray-100"
									>
											<div class="tw-text-center">
												{{ getAvailability(item, day.fullDate).reservedQuantity }}
											</div>
											<div class="tw-border-t-2  tw-border-t-gray-500 tw-w-[30px] tw-mx-4">
											</div>
													<q-popup-proxy
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
																	<dynamic-field v-model="modelValues.reason" :field="dynamicFields.reason" />
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
											<div class="tw-text-[14px] tw-text-center tw-p-2 tw-my-2 tw-bg-amber-100">
												{{ getAvailability(item, day.fullDate).price || 0 }}
											</div>
											<q-tooltip v-if="getAvailability(item, day.fullDate).reason">
												<p class="tw-text-sm">{{ getAvailability(item, day.fullDate).reason }}</p>
											</q-tooltip>

									</div>

									<div v-else class="tw-w-[100px] tw-border-2 tw-px-4">
										<div class="tw-text-center tw-text-zinc-500">
											{{ day.label }}
										</div>
										<div class="tw-text-center tw-text-zinc-500">
											{{ day.date }}
										</div>
									</div>
								</template>
							</div>
						</template>
						<div class="tw-grid tw-grid-flow-col">
							<div class="tw-w-[160px] tw-p-2">
								<q-btn 
									label="link Gamma to office" 
									color="green" 
									size="md"
									no-caps
									unelevated
									rounded 
									@click="() => {}" 
								/>
							</div>
						</div>
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
