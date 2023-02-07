<template>
  <div class="beta-feedback">
    <b-message
      title="This is a public beta test of this tool"
      type="is-warning"
      class="beta-feedback-box"
      aria-close-label="Close message"
      ><p>
        Thanks for checking out this tool! Right now, this is a public beta,
        which means that we&rsquo;re still gathering feedback, testing the data
        outputs and fixing bugs. We&rsquo;d love to hear your feedback!
        <a href="https://uaf-iarc.typeform.com/to/FN95Zbq2">
          Take a short feedback survey</a
        >, or email us at
        <a href="mailto:uaf-snap-data-tools@alaska.edu"
          >uaf&ndash;snap&ndash;data&ndash;tools@alaska.edu</a
        >
        if you encounter a problem.
        <a
          href="https://uaf.us10.list-manage.com/subscribe?u=e42f589030a3adcaddd9b3304&id=d349c58c8f"
          >Sign up for our occasional newsletter</a
        >
        to be notified when this tool is launched.
      </p>
    </b-message>
  </div>
</template>
<style lang="scss" scoped>
::v-deep .message-header p:not(:last-child) {
  margin-bottom: 0;
}
.beta-feedback-box .media-content p {
  color: #333;

  a {
    font-weight: 600;
  }
}
</style>
<script>
export default {
  name: 'BetaFeedback',
}
</script>
