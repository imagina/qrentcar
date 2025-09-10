<template>
	<div>
		<div>
			<!-- gamma office modal -->
			<master-modal
				v-model="modal.gammaOffice"
				:title="modelValues.gammaOffice?.id ? `Update gamma ${modelValues.gammaOffice.gamma.title}` : 'Add gamma'"
				@hide="modal.gammaOffice = false"
    	>
				<q-form autocorrect="off" autocomplete="off" @submit="createGammaOffice()"
																	@validation-error="$alert.error($tr('isite.cms.message.formInvalid'))">

					<dynamic-field v-for="(field, keyField) in dynamicFields.gammaOffice" :key="keyField"
							:field="field" v-model="modelValues.gammaOffice[field.name || keyField]"
					/>
					<!--Actions-->
						<div class="justify-end row q-gutter-sm">
							<q-btn :label="$tr('isite.cms.label.cancel')"
										no-caps color="grey" unelevated rounded v-close-popup />
							<q-btn :label="$tr('isite.cms.label.save')" color="green"
										no-caps unelevated rounded v-close-popup type="submit" />
						</div>
				</q-form>
			</master-modal>



			<page-actions
				:title="title"
				:extra-actions="extraActions"
				@refresh="getDailyAvailabilities()"
				:dynamicFilter="dynamicFilter"
				@updateDynamicFilterValues="filters => updateDynamicFilterValues(filters)"
			/>
		</div>

		<div class="tw-full">
			<div v-if="!gammaOffice.length" class="tw-p-12 tw-justify-center tw-text-center">
				<p>{{ $tr('isite.cms.message.searchNotFound') }}</p>
			</div>
		</div>


		<div class="">
			<div v-if="showCalendar" class=" tw-overflow-x-auto tw-py-4">
				<template v-for="(item, index) in rows ">
					<div class="tw-grid tw-grid-flow-col">
						<div 
							@click="openModalGammaOffice(item)"
							class="tw-w-[160px] tw-border-2 tw-p-2 tw-cursor-pointer hover:tw-bg-gray-100 hover:tw-border-gray-200" 
							:class="[item?.gamma ? 'tw-min-h-[100px]' : 'tw-h-[60px]', item?.gamma?.title ? '' : 'tw-bg-gray-100']"
							
						>
							
								<q-chip 
									v-if="item?.gamma"
									square
									color="primary" 
									text-color="white"
								>
								{{ item.gamma.title }}
								</q-chip>
							

							<p v-if="item?.gamma">
								{{ item.gamma.summary }}
							</p>
						</div>

						<template v-for="(day, index) in nextDays ">
							<div
								v-if="item?.gamma"
								class="tw-w-[100px] tw-items-center tw-justify-items-center tw-border-2 tw-p-2 tw-cursor-pointer hover:tw-bg-sky-100 hover:tw-border-sky-300 "
								:class="isWeekend(day.fullDate) ? 'tw-bg-slate-100' : ''"
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

															<dynamic-field v-for="(field, keyField) in dynamicFields.availability" :key="keyField"
																:field="field" v-model="modelValues.availability[field.name || keyField]"
															/>
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
									<div class="tw-text-[14px] tw-text-center tw-p-2 tw-my-2 tw-bg-amber-50">
										{{ getAvailability(item, day.fullDate).price || 0 }}
									</div>
									<q-tooltip v-if="getAvailability(item, day.fullDate).reason">
										<p class="tw-text-sm">{{ getAvailability(item, day.fullDate).reason }}</p>
									</q-tooltip>

							</div>

							<div 
								v-else 
									class="tw-w-[100px] tw-border-2 tw-px-4 tw-py-2 tw-h-[60px] "
									:class="isWeekend(day.fullDate) ? 'tw-bg-slate-200' : 'tw-bg-slate-100'"
								>
								<div class="tw-text-center tw-font-[500] tw-text-zinc-500">
									{{ day.label }}
								</div>
								<div class="tw-text-center tw-font-[800] tw-text-zinc-500">
									{{ day.date }}
								</div> 
							</div>
						</template>
					</div>
				</template>
				<div class="tw-grid tw-grid-flow-col">
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
